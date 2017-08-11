﻿using AutoMapper;
using PandaPress.Core.Models.Data;
using PandaPress.Core.Models.View;

namespace PandaPress.Core.Models.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Post, PostViewModel>()
                .ForMember(dest => dest.UserDisplayName, opts => opts.MapFrom(src => src.User.DisplayName));
            CreateMap<ApplicationUser, ProfileSettingsViewModel>();
            CreateMap<Blog, SettingsViewModel>()
                .ForMember(dest => dest.BlogName, opts => opts.MapFrom(src => src.Name))
                .ForMember(dest => dest.BlogId, opts => opts.MapFrom(src => src.Id))
                .ForMember(dest => dest.Description, opts => opts.MapFrom(src => src.Description))
                .ForMember(dest => dest.PostsPerPage, opts => opts.MapFrom(src => src.PostsPerPage));
        }
    }
}
