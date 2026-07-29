namespace QuickServe.Domain.Entities;

public class Provider : BaseEntity
{
    public Guid UserId { get; set; }
    public User User { get; set; } = null!;

    public string BusinessName { get; set; } = string.Empty;
    public string? Specialty { get; set; }
    public string? Description { get; set; }
    public string? Experience { get; set; }
    public string? Skills { get; set; }
    public string? Certificates { get; set; }
    public decimal Rating { get; set; }
    public int TotalReviews { get; set; }
    public decimal MonthlyEarnings { get; set; }
    public bool IsAvailable { get; set; } = true;

    public ICollection<Service> Services { get; set; } = new List<Service>();
    public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
}
