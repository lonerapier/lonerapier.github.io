const cssVars = [
  "--secondary",
  "--tertiary",
  "--gray",
  "--light",
  "--lightgray",
  "--highlight",
  "--dark",
  "--darkgray",
  "--codeFont",
] as const

document.addEventListener("nav", async () => {
  const center = document.querySelector(".center") as HTMLElement
  const nodes = center.querySelectorAll("code.plotly") as NodeListOf<HTMLElement>
  if (nodes.length === 0) return

  // Load Plotly from CDN if not already loaded
  if (!(window as any).Plotly) {
    const script = document.createElement("script")
    script.src = "https://cdn.jsdelivr.net/npm/plotly.js-dist-min@3.3.1/plotly.min.js"
    script.async = true
    document.head.appendChild(script)

    // Wait for it to load
    await new Promise((resolve, reject) => {
      script.onload = resolve
      script.onerror = reject
    })
  }

  const Plotly = (window as any).Plotly

  const textMapping: WeakMap<HTMLElement, string> = new WeakMap()
  for (const node of nodes) {
    textMapping.set(node, node.innerText)
  }

  async function renderPlotly() {
    const computedStyleMap = cssVars.reduce(
      (acc, key) => {
        acc[key] = window.getComputedStyle(document.documentElement).getPropertyValue(key)
        return acc
      },
      {} as Record<(typeof cssVars)[number], string>,
    )

    const paperColor = computedStyleMap["--light"]
    const fontColor = computedStyleMap["--darkgray"]

    for (const node of nodes) {
      const oldText = textMapping.get(node)
      if (!oldText) continue

      try {
        let result
        // Try to parse as JSON first (static configuration)
        try {
          result = JSON.parse(oldText)
        } catch {
          // If JSON parsing fails, treat as an executable JS function body
          // We pass 'Plotly' so users can access helpers if needed
          try {
            const fn = new Function("Plotly", oldText)
            result = fn(Plotly)
          } catch (err: any) {
            throw new Error("Failed to execute Plotly code: " + err.message)
          }
        }

        // Normalize result. It can be:
        // 1. An array (assumed to be just 'data')
        // 2. An object with 'data', 'layout', 'config'
        let data, layoutUser, configUser

        if (Array.isArray(result)) {
          data = result
          layoutUser = {}
          configUser = {}
        } else if (typeof result === 'object' && result !== null) {
          data = result.data || []
          layoutUser = result.layout || {}
          configUser = result.config || {}
        } else {
          throw new Error("Code must return an object with 'data' property or an array of data traces.")
        }

        // Prepare layout with theme colors if not explicitly overridden
        const layout = {
          paper_bgcolor: paperColor,
          plot_bgcolor: paperColor,
          font: { color: fontColor, family: computedStyleMap["--codeFont"] },
          margin: { t: 30, r: 20, b: 40, l: 40 },
          ...layoutUser
        }

        // Configuration
        const config = {
          responsive: true,
          displayModeBar: false,
          ...configUser
        }

        // Clear code content
        node.innerHTML = ""
        node.classList.add("plotly-rendered")

        // Create container
        const container = document.createElement("div")
        container.style.width = "100%"
        node.appendChild(container)

        // Remove the background of the pre tag if it exists
        const pre = node.parentElement
        if (pre && pre.tagName === 'PRE') {
          pre.style.backgroundColor = 'transparent'
          pre.style.border = 'none'
        }

        await Plotly.newPlot(container, data, layout, config)

      } catch (e: any) {
        console.error("Failed to render Plotly chart", e)
        // Display error to user
        node.innerHTML = oldText
        const errorDiv = document.createElement("div")
        errorDiv.style.color = "red"
        errorDiv.style.marginTop = "10px"
        errorDiv.style.whiteSpace = "pre-wrap"
        errorDiv.textContent = "Plotly Render Error: " + e.message
        node.appendChild(errorDiv)
      }
    }
  }

  await renderPlotly()
  document.addEventListener("themechange", renderPlotly)
  window.addCleanup(() => document.removeEventListener("themechange", renderPlotly))
})
