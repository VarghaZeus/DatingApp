using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class LikesController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly ILikesRepository _likesRepository;
        public LikesController(IUserRepository userRepository, ILikesRepository likesRepository)
        {
            _likesRepository = likesRepository;
            _userRepository = userRepository;
        }

        [HttpPost("{username}")]
        public async Task<ActionResult> AddLike(string username)
        {
            var sourceUserId = User.GetUserId();
            var LikedUser = await _userRepository.GetUserByUsernameAsync(username);
            var sourceUser = await _likesRepository.GetUserWithLikes(sourceUserId);

            if(LikedUser == null) return NotFound();

            if(sourceUser.UserName == username) return BadRequest("You Can NOT Like Yourself");

            var userLike = await _likesRepository.GetUserLike(sourceUserId, LikedUser.Id);

            if(userLike != null) {
                var removeLike = await _likesRepository.RemoveLikeAsync(sourceUserId, LikedUser.Id);
                return BadRequest(removeLike + ", Unliked " + LikedUser.KnownAs + " succesfuly");
            }

            userLike = new UserLike
            {
                SourceUserId = sourceUserId,
                LikedUserId = LikedUser.Id
            };

            sourceUser.LikedUsers.Add(userLike);

            if(await _userRepository.SaveAllAsync()) return Ok();

            return BadRequest("Failed To Like User");
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LikeDto>>> GetUserLikes([FromQuery]LikesParams likesParams)
        {
            likesParams.UserId = User.GetUserId();
           var users = await _likesRepository.GetUserLikes(likesParams);
           Response.AddPaginationHeader(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);
           return Ok(users);
        }
    }
}