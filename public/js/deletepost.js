const deletePost = async () => {
	const currentURL = window.location.href;
	const blogpost_id = currentURL.split("/")[currentURL.split("/").length - 1];

	const response = await fetch(`/api/blogposts/${blogpost_id}`, {
		method: "DELETE",
	});

	if (response.ok) {
		document.location.replace("/dashboard");
	} else {
		alert("Failed to delete post.");
	}
};

document.querySelector("#post-delete").addEventListener("click", deletePost);
