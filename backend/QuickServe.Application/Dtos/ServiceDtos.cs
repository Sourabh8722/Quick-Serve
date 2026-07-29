namespace QuickServe.Application.Dtos;

public record ServiceDto(Guid Id, string Name, string Description, string Category, decimal Price, string? ImageUrl, bool IsActive);
public record CreateServiceRequest(string Name, string Description, string Category, decimal Price, string? ImageUrl);
public record UpdateServiceRequest(string Name, string Description, string Category, decimal Price, string? ImageUrl, bool IsActive);
