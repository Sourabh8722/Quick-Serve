namespace QuickServe.Domain.Entities;

public class Service : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string? ImageUrl { get; set; }
    public bool IsActive { get; set; } = true;

    public Guid ProviderId { get; set; }
    public Provider Provider { get; set; } = null!;

    public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
}
