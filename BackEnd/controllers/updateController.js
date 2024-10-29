const Post = require('../models/post');
const mongoose = require('mongoose');

exports.updatePost = async (req, res) => {
    try {
        // 1. ID 형식 유효성 검사
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "유효하지 않은 게시글 ID입니다."
            });
        }

        // 2. 게시글 존재 여부 확인
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "해당 게시글을 찾을 수 없습니다."
            });
        }

        // 3. 작성자 권한 확인
        if (post.authorId !== req.token) {
            return res.status(403).json({
                success: false,
                message: "본인이 작성한 게시글만 수정할 수 있습니다."
            });
        }

        // 4. 수정할 내용 검증
        const { title, category, shortAnswer, detailedAnswer } = req.body;
        
        if (!title || !category || !shortAnswer || !detailedAnswer) {
            return res.status(400).json({
                success: false,
                message: "필수 입력 항목이 누락되었습니다."
            });
        }

        // 5. 게시글 수정 실행
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {
                title,
                category,
                shortAnswer,
                detailedAnswer
            },
            { new: true } // 수정된 문서 반환
        );

        // 6. 수정 성공 응답
        return res.status(200).json({
            success: true,
            message: "게시글이 성공적으로 수정되었습니다.",
            data: updatedPost
        });

    } catch (error) {
        console.error('Update Post Error:', error);
        return res.status(500).json({
            success: false,
            message: "서버 오류가 발생했습니다.",
            error: error.message
        });
    }
};