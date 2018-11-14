module.exports = {
    answers : (res, status, result, msg, data) => {
        res.status(status).json({
            result: result,
            msg: msg || "",
            data: data || null
        });
    }
}