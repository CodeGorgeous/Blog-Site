document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        document.title = "集中一点,登峰造极";
    } else {
        document.title = "CodeGorgeous";
    }
})