using CoreFlow.Models;
using Microsoft.EntityFrameworkCore;

namespace CoreFlow.Data;

public class CoreFlowDbContext : DbContext
{
    public CoreFlowDbContext(DbContextOptions<CoreFlowDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users { get; set; } = null!;
} 