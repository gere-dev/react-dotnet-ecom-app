using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {

        [HttpGet("not found")]
        public ActionResult GetNotFound()
        {
            return NotFound();
        }

        [HttpGet("bad-request")]
        public ActionResult GetBadRequest()
        {
            return BadRequest("This is bad request");
        }


        [HttpGet("anauthorized")]
        public ActionResult GetUnauthorized()
        {
            return Unauthorized();
        }


        [HttpGet("validation-error")]
        public ActionResult GetValidationError()
        {
            ModelState.AddModelError("Problem1", "this is the second error");
            ModelState.AddModelError("Problem1", "this is the second error");

            return ValidationProblem();
        }


        [HttpGet("server-error")]
        public ActionResult GetServerError()
        {
            throw new Exception("this is a server error");
        }


    }
}