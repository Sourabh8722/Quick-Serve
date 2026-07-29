namespace QuickServe.Application.Dtos;

public record ProviderDto(Guid Id, string BusinessName, string Specialty, string Description, decimal Rating, int TotalReviews, decimal MonthlyEarnings, bool IsAvailable);
public record CreateProviderRequest(string BusinessName, string Specialty, string Description, string Experience, string Skills, string Certificates);
public record UpdateProviderRequest(string BusinessName, string Specialty, string Description, string Experience, string Skills, string Certificates, bool IsAvailable);
