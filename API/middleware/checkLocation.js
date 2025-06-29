const checkLocationMiddleware = (req, res, next) => {
    const kantorLat = -6.200000;
    const kantorLon = 106.816666;
    const maxDistanceMeter = 100;

    const lat = parseFloat(req.body.lat);
    const lon = parseFloat(req.body.lon);

    console.log(`Lat : ${lat}, Lon : ${lon}`)

    if(!lat || !lon)
    {
        res.status(400).json({message: "Gagal mengambil location"});
    }

    const getDistance = (lat, lon, kantorLat, kantorLon) => {
        const R = 6371000; // Radius bumi dalam meter
        const dLat = (kantorLat - lat) * Math.PI / 180;
        const dLon = (kantorLon - lon) * Math.PI / 180;

        const a = 
            Math.sin(dLat / 2) ** 2 +
            Math.cos(lat * Math.PI / 180) * Math.cos(kantorLat * Math.PI / 180) *
            Math.sin(dLon / 2) ** 2;

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    // const distance = getDistance(lat, lon, kantorLat, kantorLon);
    const distance = getDistance(lat, lon, kantorLat, kantorLon);
    console.log(distance);
    
    if(distance > maxDistanceMeter)
    {
        return res.status(403).json({message: "Anda berada di luar area absensi kantor!"});
    }

    next();
}

module.exports = checkLocationMiddleware;