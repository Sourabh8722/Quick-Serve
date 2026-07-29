namespace QuickServe.Domain.Entities;

public class Customer : BaseEntity
{
    public Guid UserId { get; set; }
    public User User { get; set; } = null!;

    public string? PreferredLocation { get; set; }
    public string? Notes { get; set; }

    public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
    public ICollection<Payment> Payments { get; set; } = new List<Payment>();
    public ICollection<Review> Reviews { get; set; } = new List<Review>();
}
