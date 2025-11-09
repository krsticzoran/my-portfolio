
export async function addComment( data: {
    comment:string} 
) {

    console.log("Comment added:", data.comment);
    return { success: true, message: "Comment added successfully" };
}
