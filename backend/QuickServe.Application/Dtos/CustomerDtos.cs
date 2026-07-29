namespace QuickServe.Application.Dtos;

public record CustomerDto(Guid Id, string FullName, string Email, string? PreferredLocation, string? Notes);
public record CreateCustomerRequest(string PreferredLocation, string Notes);
public record UpdateCustomerRequest(string PreferredLocation, string Notes);
