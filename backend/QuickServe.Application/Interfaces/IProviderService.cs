using QuickServe.Application.Dtos;

namespace QuickServe.Application.Interfaces;

public interface IProviderService
{
    Task<IReadOnlyList<ProviderDto>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<ProviderDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<ProviderDto> CreateAsync(Guid userId, CreateProviderRequest request, CancellationToken cancellationToken = default);
    Task<ProviderDto?> UpdateAsync(Guid id, UpdateProviderRequest request, CancellationToken cancellationToken = default);
    Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default);
}
