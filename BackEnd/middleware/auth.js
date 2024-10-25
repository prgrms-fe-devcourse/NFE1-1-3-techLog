// middleware/auth.js
const verifyToken = (req, res, next) => {
    // 헤더에서 토큰 가져오기
    const token = req.header('Authorization');
    // 토큰이 없는 경우
    if (!token) {
        return res.status(401).json({ message: '인증 토큰이 필요합니다.' });
    }
    try {
        // 테스트용이므로 토큰이 존재하기만 하면 통과
        // 실제 환경에서는 JWT 등을 사용하여 토큰 검증 필요
        if (token.startsWith('Bearer ')) {
            // Bearer 토큰에서 실제 토큰 값만 추출
            req.token = token.slice(7);
            next();
        } else {
            throw new Error('잘못된 토큰 형식입니다.');
        }
    } catch (err) {
        res.status(401).json({ message: '유효하지 않은 토큰입니다.' });
    }
};
module.exports = verifyToken;