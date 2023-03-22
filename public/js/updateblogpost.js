const updatePostHandler = async (event) => {
	event.preventDefault();

	const currentURL = window.location.href;
	const blogpost_id = currentURL.split("/")[currentURL.split("/").length - 1];

	const title = document.querySelector("#blog-title").value.trim();
	const post = document.querySelector("#blog-post").value.trim();

	if (title && post && blogpost_id) {
		const response = await fetch("/api/blogposts", {
			method: "PUT",
			body: JSON.stringify({ title, post, blogpost_id }),
			headers: { "Content-Type": "application/json" },
		});

		if (response.ok) {
			document.location.replace("/dashboard");
		} else {
			alert("Failed to update blog");
		}
	}
};

document.querySelector(".blogpost-form").addEventListener("submit", updatePostHandler);
