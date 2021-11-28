const Course = require('./models/course')
const Comment = require('./models/comment')
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You musted be signed in')
        return res.redirect('/login')
    }
    next();
}

module.exports.isTeacher = async(req,res,next) => {
    const {id} = req.params;
    const course = await Course.findById(id);
    if(!course.teacher.equals(req.user._id)){
        req.flash('error',"You don't have permissions")
        return res.redirect(`/courses/${id}`);
    }
    next();
}

module.exports.isCommentUser = async(req,res,next) => {
    const { id,lectureId,commentId } = req.params;
    const comment = await Comment.findById(commentId);
    if(!comment.user.equals(req.user._id)){
        req.flash('error', "You don't have permissions")
        return res.redirect(`/courses/${id}/lectures/${lectureId}`);
    }
    next();
}