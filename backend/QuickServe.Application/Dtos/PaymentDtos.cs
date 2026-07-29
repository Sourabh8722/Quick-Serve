namespace QuickServe.Application.Dtos;

public record PaymentDto(Guid Id, Guid BookingId, decimal Amount, string PaymentMethod, string Status, DateTime PaidAt);
public record CreatePaymentRequest(Guid BookingId, decimal Amount, string PaymentMethod);
