Add-Type -AssemblyName System.Drawing

$destDir = "c:\Users\Admin\Downloads\RESUME\certificates"
if (-not (Test-Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir | Out-Null
}

$crops = @(
    # Hackathons & Competitions
    @{
        Source = "WhatsApp Image 2026-11-02 at 6.30.48 PM (1).jpeg"
        Target = "hackathon-isro-antariksh.jpg"
        X = 10; Y = 573; W = 718; H = 553
    },
    @{
        Source = "WhatsApp Image 2026-11-02 at 6.30.35 PM (1).jpeg"
        Target = "hackathon-et-ai-2.0.jpg"
        X = 10; Y = 190; W = 718; H = 504
    },
    @{
        Source = "WhatsApp Image 2026-11-02 at 6.30.54 PM.jpeg"
        Target = "hackathon-ey-techathon-6.0.jpg"
        X = 10; Y = 522; W = 718; H = 528
    },
    @{
        Source = "WhatsApp Image 2026-11-02 at 6.30.48 PM.jpeg"
        Target = "hackathon-oosc-4.0.jpg"
        X = 31; Y = 669; W = 676; H = 461
    },
    @{
        Source = "WhatsApp Image 2026-11-02 at 6.30.46 PM.jpeg"
        Target = "hackathon-ai-builders-gl-bajaj.jpg"
        X = 10; Y = 579; W = 718; H = 521
    },
    @{
        Source = "WhatsApp Image 2026-11-02 at 6.30.47 PM.jpeg"
        Target = "hackathon-chaos-clarity.jpg"
        X = 10; Y = 185; W = 718; H = 523
    },
    @{
        Source = "WhatsApp Image 2026-11-02 at 6.30.37 PM (1).jpeg"
        Target = "hackathon-zynetrox.jpg"
        X = 0; Y = 539; W = 738; H = 521
    },
    @{
        Source = "WhatsApp Image 2026-11-02 at 6.30.52 PM (2).jpeg"
        Target = "hackathon-inventra-rnsit.jpg"
        X = 0; Y = 543; W = 738; H = 514
    },
    @{
        Source = "WhatsApp Image 2026-11-02 at 6.30.53 PM (1).jpeg"
        Target = "contest-quizoff-ai.jpg"
        X = 0; Y = 84; W = 1600; H = 1046
    },
    @{
        Source = "WhatsApp Image 2026-11-02 at 6.30.37 PM.jpeg"
        Target = "contest-naukri-young-turks-merit.jpg"
        X = 30; Y = 480; W = 678; H = 472
    },
    @{
        Source = "WhatsApp Image 2026-11-02 at 6.30.36 PM.jpeg"
        Target = "contest-naukri-young-turks-round2.jpg"
        X = 0; Y = 70; W = 738; H = 1445
    },

    # Courses & Technical Certifications
    @{
        Source = "WhatsApp Image 2026-11-02 at 6.30.56 PM.jpeg"
        Target = "course-nvidia-jetson-ai.jpg"
        X = 0; Y = 9; W = 1075; H = 1136
    },
    @{
        Source = "WhatsApp Image 2026-11-02 at 6.30.54 PM (2).jpeg"
        Target = "course-nasscom-digital-engineering.jpg"
        X = 10; Y = 205; W = 718; H = 480
    },
    @{
        Source = "WhatsApp Image 2026-11-02 at 6.30.35 PM.jpeg"
        Target = "course-coursera-bigdata-hadoop.jpg"
        X = 10; Y = 557; W = 718; H = 563
    },
    @{
        Source = "WhatsApp Image 2026-11-02 at 6.30.51 PM (1).jpeg"
        Target = "course-skill-india-genai.jpg"
        X = 10; Y = 597; W = 718; H = 521
    },
    @{
        Source = "WhatsApp Image 2026-11-02 at 6.30.51 PM.jpeg"
        Target = "course-infosys-machine-learning.jpg"
        X = 10; Y = 597; W = 718; H = 520
    },
    @{
        Source = "WhatsApp Image 2026-11-02 at 6.30.52 PM.jpeg"
        Target = "course-infosys-artificial-intelligence.jpg"
        X = 0; Y = 543; W = 738; H = 513
    },
    @{
        Source = "WhatsApp Image 2026-11-02 at 6.30.55 PM (1).jpeg"
        Target = "course-infosys-python.jpg"
        X = 0; Y = 0; W = 963; H = 687
    },
    @{
        Source = "WhatsApp Image 2026-11-02 at 6.30.55 PM.jpeg"
        Target = "course-iit-bombay-python.jpg"
        X = 10; Y = 585; W = 718; H = 465
    },
    @{
        Source = "WhatsApp Image 2026-11-02 at 6.30.55 PM (2).jpeg"
        Target = "course-iit-bombay-c.jpg"
        X = 4; Y = 538; W = 730; H = 522
    },
    @{
        Source = "WhatsApp Image 2026-11-02 at 6.30.57 PM.jpeg"
        Target = "course-simplilearn-genai-analytics.jpg"
        X = 56; Y = 501; W = 626; H = 408
    },
    @{
        Source = "WhatsApp Image 2026-11-02 at 6.30.57 PM (1).jpeg"
        Target = "course-simplilearn-c-basics.jpg"
        X = 56; Y = 501; W = 626; H = 408
    },
    @{
        Source = "WhatsApp Image 2026-11-02 at 6.30.54 PM (1).jpeg"
        Target = "course-deloitte-data-analytics.jpg"
        X = 10; Y = 208; W = 718; H = 477
    },
    @{
        Source = "WhatsApp Image 2026-11-02 at 6.30.53 PM.jpeg"
        Target = "course-ieee-bti-ai-fdp.jpg"
        X = 0; Y = 8; W = 1010; H = 827
    },
    @{
        Source = "WhatsApp Image 2026-11-02 at 6.30.52 PM (1).jpeg"
        Target = "course-grad-guru-webinar.jpg"
        X = 0; Y = 560; W = 738; H = 479
    },
    @{
        Source = "WhatsApp Image 2026-11-02 at 6.30.47 PM (1).jpeg"
        Target = "workshop-rotaract-rnsit.jpg"
        X = 10; Y = 597; W = 718; H = 520
    },

    # Experience & Internship Certificates
    @{
        Source = "WhatsApp Image 2026-11-02 at 6.30.45 PM.jpeg"
        Target = "internship-yuvaintern-cv-specialist.jpg"
        X = 10; Y = 336; W = 718; H = 1042
    },
    @{
        Source = "WhatsApp Image 2026-11-02 at 6.30.46 PM (2).jpeg"
        Target = "internship-yuvaintern-data-science.jpg"
        X = 10; Y = 320; W = 718; H = 1058
    },
    @{
        Source = "WhatsApp Image 2026-11-02 at 6.30.49 PM (1).jpeg"
        Target = "offerletter-yuvaintern-cv.jpg"
        X = 10; Y = 336; W = 718; H = 1042
    },
    @{
        Source = "WhatsApp Image 2026-11-02 at 6.30.49 PM.jpeg"
        Target = "offerletter-yuvaintern-ds.jpg"
        X = 10; Y = 336; W = 718; H = 1042
    }
)

foreach ($c in $crops) {
    $srcPath = Join-Path "c:\Users\Admin\Downloads\RESUME" $c.Source
    $dstPath = Join-Path $destDir $c.Target
    
    if (-not (Test-Path $srcPath)) {
        Write-Warning "Source file not found: $($c.Source)"
        continue
    }

    $srcBmp = [System.Drawing.Bitmap]::FromFile($srcPath)
    
    $cropX = [Math]::Max(0, $c.X)
    $cropY = [Math]::Max(0, $c.Y)
    $cropW = [Math]::Min($c.W, $srcBmp.Width - $cropX)
    $cropH = [Math]::Min($c.H, $srcBmp.Height - $cropY)
    
    $rect = [System.Drawing.Rectangle]::new($cropX, $cropY, $cropW, $cropH)
    $dstBmp = [System.Drawing.Bitmap]::new($cropW, $cropH)
    
    $g = [System.Drawing.Graphics]::FromImage($dstBmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.DrawImage($srcBmp, [System.Drawing.Rectangle]::new(0, 0, $cropW, $cropH), $rect, [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()
    
    $dstBmp.Save($dstPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $dstBmp.Dispose()
    $srcBmp.Dispose()
    
    Write-Host "Cropped: $($c.Target) ($cropW x $cropH)"
}

Write-Host "Updated all cropped certificates!"
