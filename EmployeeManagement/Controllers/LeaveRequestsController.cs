using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployeeManagement.Models;

[Route("api/[controller]")]
[ApiController]
public class LeaveRequestsController : ControllerBase
{
    private readonly EmployeeManagementContext _context;

    public LeaveRequestsController(EmployeeManagementContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<LeaveRequest>>> GetLeaveRequests()
    {
        return await _context.LeaveRequests.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<LeaveRequest>> GetLeaveRequest(int id)
    {
        var leaveRequest = await _context.LeaveRequests.FindAsync(id);

        if (leaveRequest == null)
            return NotFound();

        return leaveRequest;
    }

    [HttpPost]
    public async Task<ActionResult<LeaveRequest>> PostLeaveRequest(LeaveRequest leaveRequest)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        _context.LeaveRequests.Add(leaveRequest);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetLeaveRequest), new { id = leaveRequest.Id }, leaveRequest);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutLeaveRequest(int id, LeaveRequest leaveRequest)
    {
        if (id != leaveRequest.Id)
            return BadRequest();

        _context.Entry(leaveRequest).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.LeaveRequests.Any(e => e.Id == id))
                return NotFound();
            else
                throw;
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteLeaveRequest(int id)
    {
        var leaveRequest = await _context.LeaveRequests.FindAsync(id);
        if (leaveRequest == null)
            return NotFound();

        _context.LeaveRequests.Remove(leaveRequest);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
