# Build stage
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy csproj and restore dependencies
COPY JebIncubator.Api/*.csproj JebIncubator.Api/
RUN dotnet restore JebIncubator.Api/JebIncubator.Api.csproj

# Copy everything else and build
COPY JebIncubator.Api/ JebIncubator.Api/
RUN dotnet publish JebIncubator.Api/JebIncubator.Api.csproj -c Release -o /app/publish

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

# Expose port 5000
EXPOSE 5000

ENTRYPOINT ["dotnet", "JebIncubator.Api.dll"]