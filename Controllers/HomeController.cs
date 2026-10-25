using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using RigidproSoftSite.Models;

namespace RigidproSoftSite.Controllers;

public class HomeController : Controller
{
    public IActionResult Index()
    {
        return View();
    }

    [HttpPost]
    public IActionResult SubmitContact([FromBody] ContactMessage model)
    {
        if (model == null || string.IsNullOrWhiteSpace(model.Name) || string.IsNullOrWhiteSpace(model.Email))
        {
            return Json(new 
            { 
                success = false, 
                message = "Please provide your name and a valid email address." 
            });
        }

        // Pure in-memory/static response without database requirement
        return Json(new 
        { 
            success = true, 
            message = $"Thank you, {model.Name}! Your message regarding '{model.Service ?? "Software Development"}' has been received. Our team will contact you at {model.Email} within 24 hours.",
            timestamp = DateTime.UtcNow.ToString("yyyy-MM-dd HH:mm:ss")
        });
    }

    [HttpGet]
    public IActionResult GetProjectsJson()
    {
        var projects = new[]
        {
            new {
                Id = 1,
                Title = "E-Commerce Platform",
                Category = "web",
                CategoryName = "Web Development",
                Tags = new[] { "Web Development", "E-Commerce" },
                Image = "/images/project_ecommerce.jpg",
                Description = "A full-featured e-commerce solution with secure payments, inventory management, and admin dashboard.",
                LongDescription = "Rigidpro Soft engineered an enterprise-grade e-commerce ecosystem featuring instantaneous checkout, automated inventory sync across multiple warehouses, intelligent product recommendations, and real-time sales reporting analytics.",
                TechStack = new[] { ".NET Core", "React", "SQL Server", "Redis", "Stripe API", "Docker" },
                Client = "BrightCart Retail Inc.",
                Duration = "4 Months",
                Impact = "+145% Online Sales Increase"
            },
            new {
                Id = 2,
                Title = "Fitness Mobile App",
                Category = "mobile",
                CategoryName = "Mobile App",
                Tags = new[] { "Mobile App", "Health & Fitness" },
                Image = "/images/project_fitness.jpg",
                Description = "A cross-platform fitness app with workout plans, progress tracking, and personalized recommendations.",
                LongDescription = "A native-feel iOS and Android fitness application built with responsive motion tracking, customized daily workout schedules, biometric integration (Apple Health & Google Fit), and social leaderboards.",
                TechStack = new[] { "Flutter", "ASP.NET Core Web API", "Firebase", "WebSockets", "HealthKit" },
                Client = "HealthPlus Active",
                Duration = "3 Months",
                Impact = "250K+ Active Daily Users"
            },
            new {
                Id = 3,
                Title = "Business Management System",
                Category = "erp",
                CategoryName = "Web Development / ERP",
                Tags = new[] { "Web Development", "ERP" },
                Image = "/images/project_erp.jpg",
                Description = "A complete ERP solution to manage sales, accounting, HR, and inventory.",
                LongDescription = "An all-in-one scalable enterprise resource planning (ERP) platform connecting procurement, multi-departmental HR payroll, automated invoicing, supply chain tracking, and executive KPI visual analytics.",
                TechStack = new[] { "ASP.NET Core", "Bootstrap 5", "Chart.js", "Entity Framework", "Azure Cloud" },
                Client = "Aura Global Solutions",
                Duration = "6 Months",
                Impact = "60% Reduction in Operational Overhead"
            }
        };

        return Json(projects);
    }

    [HttpGet]
    public IActionResult GetInnovationsJson()
    {
        var innovations = new[]
        {
            new {
                Id = 1,
                Title = "AI-Powered Solutions",
                Icon = "bi-cpu",
                Badge = "Next-Gen AI",
                Description = "Leveraging artificial intelligence to create smarter and more efficient applications.",
                FocusAreas = new[] { "Predictive Data Engines", "Conversational AI & LLMs", "Smart Vision Automation" }
            },
            new {
                Id = 2,
                Title = "SaaS Products",
                Icon = "bi-cloud-arrow-up",
                Badge = "Cloud Native",
                Description = "Building scalable SaaS products to solve real-world problems.",
                FocusAreas = new[] { "Multi-Tenant Architecture", "Stripe Billing Integrations", "Auto-Scaling Microservices" }
            },
            new {
                Id = 3,
                Title = "IoT Integration",
                Icon = "bi-wifi",
                Badge = "Connected Tech",
                Description = "Connecting devices and data for smarter decision-making.",
                FocusAreas = new[] { "Hardware Telemetry", "Real-Time Sensor Dashboards", "Edge Gateway Sync" }
            },
            new {
                Id = 4,
                Title = "Next-Gen Web Technologies",
                Icon = "bi-code-square",
                Badge = "High Velocity",
                Description = "Exploring modern frameworks and tools for better performance and user experience.",
                FocusAreas = new[] { "WebAssembly & Rust Modules", "Edge-Rendered Web Apps", "Progressive Web Apps (PWA)" }
            }
        };

        return Json(innovations);
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
