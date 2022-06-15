import { VercelRequest, VercelResponse } from '@vercel/node';
module.exports = async (_req: VercelRequest, res: VercelResponse) => {
    const data = {
        msg: "hello world!123"
    };
    res.status(200).json(data);
}