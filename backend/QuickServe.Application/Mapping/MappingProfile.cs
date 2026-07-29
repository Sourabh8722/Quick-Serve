using AutoMapper;
using QuickServe.Application.Dtos;
using QuickServe.Domain.Entities;

namespace QuickServe.Application.Mapping;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<User, AuthResponse>();
        CreateMap<Provider, ProviderDto>();
        CreateMap<CreateProviderRequest, Provider>();
        CreateMap<UpdateProviderRequest, Provider>();

        CreateMap<Customer, CustomerDto>()
            .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.User.FullName))
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.User.Email));
        CreateMap<CreateCustomerRequest, Customer>();
        CreateMap<UpdateCustomerRequest, Customer>();

        CreateMap<Service, ServiceDto>();
        CreateMap<CreateServiceRequest, Service>();
        CreateMap<UpdateServiceRequest, Service>();

        CreateMap<Booking, BookingDto>();
        CreateMap<CreateBookingRequest, Booking>();

        CreateMap<Payment, PaymentDto>();
        CreateMap<CreatePaymentRequest, Payment>();

        CreateMap<Review, ReviewDto>();
        CreateMap<CreateReviewRequest, Review>();

        CreateMap<Notification, NotificationDto>();
        CreateMap<CreateNotificationRequest, Notification>();
        CreateMap<UpdateNotificationRequest, Notification>();
    }
}
