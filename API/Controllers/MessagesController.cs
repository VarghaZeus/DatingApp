using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class MessagesController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMessageRepository _messageRepository;
        private readonly IMapper _imapper;
        public MessagesController(IUserRepository userRepository, IMessageRepository messageRepository, IMapper imapper)
        {
            _userRepository = userRepository;
            _messageRepository = messageRepository;
            _imapper = imapper;
        }

        [HttpPost]
        public async Task<ActionResult<MessageDto>> CreateMessage(CreateMessageDto createmessageDto)
        {
            var username = User.GetUsername();
            if(username == createmessageDto.RecipientUsername.ToLower()) 
                return BadRequest("You Cannot sent massage to yourself!");
            var sender = await _userRepository.GetUserByUsernameAsync(username);
            var recipient = await _userRepository.GetUserByUsernameAsync(createmessageDto.RecipientUsername);
             if(recipient == null) return NotFound();

            var message = new Message{
                Sender= sender,
                Recipient = recipient,
                SenderUsername = sender.UserName,
                RecipientUsername = recipient.UserName,
                Content = createmessageDto.Content
            };

            _messageRepository.AddMessage(message);

            if (await _messageRepository.SaveAllAsync()) return Ok(_imapper.Map<MessageDto>(message));

            return BadRequest("Failed To Send Message!");
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessageFromUser([FromQuery] MessageParams messageProms)
        {
            messageProms.username = User.GetUsername();

            var massages = await _messageRepository.GetMessageForUser(messageProms);

            Response.AddPaginationHeader(massages.CurrentPage, massages.PageSize, massages.TotalCount, massages.TotalPages);

            return massages;
        }
        [HttpGet("thread/{username}")]
        public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessageTread(string username)
        {
            var currentUsername = User.GetUsername();
            return Ok(await _messageRepository.GetMessageThread(currentUsername, username));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMessage(int id)
        {
            var username = User.GetUsername();
            var message = await _messageRepository.GetMessage(id);
            if(message.Sender.UserName != username && message.Recipient.UserName != username) return Unauthorized();
            if(message.Sender.UserName == username) message.SenderDeleted = true;
            if(message.Recipient.UserName == username) message.RecipientDeleted = true;
            if(message.SenderDeleted && message.RecipientDeleted) _messageRepository.DeleteMessage(message);
            if(await _messageRepository.SaveAllAsync()) return Ok();
            return BadRequest("Problem Deleting The Message");
        }


    }
}