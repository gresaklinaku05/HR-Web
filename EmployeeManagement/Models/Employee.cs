namespace EmployeeManagement.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? Phone { get; set; }
        public DateTime HireDate { get; set; }
        public int? DepartmentId { get; set; }
        public decimal Salary { get; set; }
        public int? RoleId { get; set; }
    }
}
