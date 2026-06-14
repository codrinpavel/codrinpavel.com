/*
window.addEventListener("pagereveal", (event) => {
  if (!event.viewTransition) {
    console.log(
      "No view transition - page didn't opt in or browser skipped it",
    );
    return;
  } // This is the one that'll save your sanity

  event.viewTransition.finished
    .then(() => console.log("Transition completed ✅"))
    .catch((err) => {
      // You'll see "TimeoutError" here and nowhere else
      console.error("Transition killed:", err.name, err.message);
    });
});

/*
async function performTransition() {
  try {
    const transition = document.startViewTransition(() => {
      // Update your DOM here
      updateTheDOM();
    });

    // Wait for the transition to finish, but catch skips
    await transition.finished;
  } catch (e) {
    if (e.name !== 'AbortError') throw e;
    // Transition was skipped, which is often fine
  }
}
*/

/**
function showDetail() {
  document.startViewTransition(() => {
    document.getElementById("grid-view").hidden = true;
    document.getElementById("detail-view").hidden = false;
  });
}
 */