const express = require('express');
const ytDlp = require('yt-dlp-exec');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/api/hd-download', async (req, res) => {
    const rawUrl = req.query.url;
    
    if (!rawUrl) {
        return res.status(400).json({ error: "Link kahan hai bhai?" });
    }

    try {
        console.log("HD Video Nikaal Raha Hu: ", rawUrl);
        
        // Asli Jadoo: yt-dlp seedha Instagram ke main server se video nikalega
        const output = await ytDlp(rawUrl, {
            dumpJson: true,
            noWarnings: true,
            noCheckCertificate: true,
            format: 'best' // Sabse high quality MP4
        });

        if (output && output.url) {
            res.json({
                success: true,
                video_url: output.url // Seedha Original Video Link
            });
        } else {
            res.status(500).json({ error: "Bhai Reel Private Hai Ya Delete Ho Gayi!" });
        }
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "System Error: Instagram ne block kiya!" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Rajit Ka HD Backend Zinda Hai Port: " + PORT);
});
