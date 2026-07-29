namespace QuickServe.Application.Dtos;

public record ReviewDto(Guid Id, Guid BookingId, int Rating, string Comment);
public record CreateReviewRequest(Guid BookingId, int Rating, string Comment);
