import { Response} from 'express';

const cookieToken = (user: any, res: Response) => {
    const token = user.getSignedJwtToken();
    const cookiesExpire = Number(process.env.JWT_COOKIE_EXPIRE) || 30;
    const options = {
        expires: new Date(Date.now() + cookiesExpire * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", 
        sameSite: process.env.NODE_ENV === "production" ? "none" as const : "lax" as const,
    };

    user.password = undefined;
    res.status(200).cookie('token', token, options).json({
        success: true,
        token,
        user,
    });
}

export default cookieToken;
