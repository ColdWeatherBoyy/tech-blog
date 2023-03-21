// pulled from EDX curriculum module 14 unit 16
const newPostHandler = async (event) => {
	event.preventDefault();

	const title = document.querySelector("#blog-title").value.trim();
	const post = document.querySelector("#blog-post").value.trim();

	if (title && post) {
		const response = await fetch("/api/blogposts", {
			method: "POST",
			body: JSON.stringify({ title, post }),
			headers: { "Content-Type": "application/json" },
		});

		if (response.ok) {
			document.location.replace("/dashboard");
		} else {
			alert("Failed to add blog");
		}
	}
};

document.querySelector(".blogpost-form").addEventListener("submit", newPostHandler);
