namespace QuickServe.Domain.Entities;

public class Payment : BaseEntity
{
    public Guid BookingId { get; set; }
    public Booking Booking { get; set; } = null!;

    public Guid CustomerId { get; set; }
    public Customer Customer { get; set; } = null!;

    public decimal Amount { get; set; }
    public string PaymentMethod { get; set; } = "Card";
    public string Status { get; set; } = "Pending";
    public DateTime PaidAt { get; set; }
}
