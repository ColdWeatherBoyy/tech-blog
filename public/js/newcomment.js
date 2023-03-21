const newCommentHandler = async (event) => {
	event.preventDefault();

	const comment = document.querySelector("#comment-post").value.trim();

	if (comment) {
		const response = await fetch("/api/comments", {
			method: "POST",
			body: JSON.stringify({ comment }),
			headers: { "Content-Type": "application/json" },
		});

		if (response.ok) {
			document.location.href = document.location.href;
			// window.location.reload();
		} else {
			alert("Failed to add comment");
		}
	}
};

document.querySelector(".comment-form").addEventListener("submit", newCommentHandler);
