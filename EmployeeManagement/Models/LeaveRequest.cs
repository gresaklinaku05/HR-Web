namespace EmployeeManagement.Models
{
    public class LeaveRequest
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public string? EmployeeName { get; set; }
        public DateTime LeaveDate { get; set; }
        public string? Status { get; set; }
    }
}
