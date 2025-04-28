namespace EmployeeManagement.Models
{
    public class Report
    {
        public int Id { get; set; }
        public string? ReportType { get; set; }
        public DateTime GeneratedDate { get; set; }
        public string? Data { get; set; }
    }
}
