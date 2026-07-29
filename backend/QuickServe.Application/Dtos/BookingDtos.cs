namespace QuickServe.Application.Dtos;

public record BookingDto(Guid Id, Guid CustomerId, Guid ProviderId, Guid ServiceId, DateTime ScheduledAt, string PreferredTime, string Address, string Notes, decimal Amount, string Status);
public record CreateBookingRequest(Guid ProviderId, Guid ServiceId, DateTime ScheduledAt, string PreferredTime, string Address, string Notes, decimal Amount);
public record UpdateBookingStatusRequest(string Status);
