import cookie from 'cookie'

// this function will take in the request, if request passed in take the stored cookie, if not exist or no request empty string
export function parseCookies(req) {
    return cookie.parse(req ? req.headers.cookie || '' : '')
}