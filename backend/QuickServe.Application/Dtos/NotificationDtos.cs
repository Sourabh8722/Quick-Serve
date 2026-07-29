namespace QuickServe.Application.Dtos;

public record NotificationDto(Guid Id, string Title, string Message, bool IsRead, string Type);
public record CreateNotificationRequest(string Title, string Message, string Type);
public record UpdateNotificationRequest(bool IsRead);
