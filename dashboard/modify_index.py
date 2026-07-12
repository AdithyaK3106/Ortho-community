import re

def process_html():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # 1. Add classification logic right after const coreFiles = ...
    classification_code = """
  /* ---------- node classification ---------- */
  const classifyNode = f => {
    const p = f.toLowerCase();
    const b = base(f).toLowerCase();
    if (b === "__init__.py") return "Package";
    if (p.includes("/test") || p.includes("conftest.py") || b.endsWith("_test.py")) return "Test";
    if (p.includes("/generated") || p.includes("migration") || p.includes("cache") || p.includes("build")) return "Generated";
    if (p.includes("/doc") || b.endsWith(".md") || b.endsWith(".rst")) return "Documentation";
    if (p.includes("/example")) return "Examples";
    if (p.includes("/script") || p.includes("/tool") || b.endsWith(".sh")) return "Scripts";
    if (b === "setup.py" || b === "manage.py" || b.endsWith(".toml") || b.endsWith(".json") || b.endsWith(".yml") || b.includes("config") || b.includes("settings")) return "Configuration";
    
    // Architectural roles
    if (b.includes("controller") || b.includes("view") || b.includes("api") || b.includes("route")) return "Controller";
    if (b.includes("service") || b.includes("manager") || b.includes("handler")) return "Service";
    if (b.includes("model") || b.includes("schema") || b.includes("entity") || b.includes("db") || b.includes("data")) return "Model";
    if (b.includes("repo") || b.includes("store") || b.includes("dao")) return "Repository";
    if (b.includes("util") || b.includes("helper") || b.includes("common") || b.includes("constant") || b.includes("type")) return "Utility";
    
    return "Business Logic";
  };
  
  const roleColors = {
    "Controller": "#e66767",
    "Service": "#3987e5",
    "Model": "#199e70",
    "Repository": "#c98500",
    "Utility": "#9085e9",
    "Configuration": "#d95926",
    "Test": "#52514e",
    "Package": "#898781",
    "Generated": "#52514e",
    "Documentation": "#52514e",
    "Examples": "#52514e",
    "Scripts": "#52514e",
    "Business Logic": "#3987e5"
  };

  const roleWeights = {
    "Package": 0.25,
    "Test": 0.30,
    "Generated": 0.20,
    "Documentation": 0.20,
    "Examples": 0.20,
    "Scripts": 0.20,
    "Configuration": 0.40,
    "Controller": 1.25,
    "Service": 1.25,
    "Model": 1.25,
    "Repository": 1.25,
    "Utility": 1.0,
    "Business Logic": 1.25
  };

  files.forEach(f => {
    D.files[f].role = classifyNode(f);
  });
"""
    html = html.replace('const coreFiles = files.filter(isCore).length ? files.filter(isCore) : files;', 
                        'const coreFiles = files.filter(isCore).length ? files.filter(isCore) : files;\n' + classification_code)

    # 2. Add Composition Summary UI
    composition_ui = """
      <div class="card" style="margin-bottom:14px">
        <h3>Repository Composition</h3>
        <div id="repo-composition" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;"></div>
      </div>
"""
    html = html.replace('<div class="tiles" id="tiles"></div>', 
                        '<div class="tiles" id="tiles"></div>\n' + composition_ui)

    # 3. Add composition logic
    composition_logic = """
  /* ================= VIEW 1: repository composition ================= */
  (() => {
    const comp = {};
    files.forEach(f => {
      const r = D.files[f].role;
      comp[r] = (comp[r] || 0) + 1;
    });
    const wrap = $("#repo-composition");
    const sorted = Object.entries(comp).sort((a, b) => b[1] - a[1]);
    sorted.forEach(([role, count]) => {
      const pct = Math.round((count / files.length) * 100);
      wrap.appendChild(el("div", "bar-row",
        `<span class="bl" style="color:${roleColors[role]}">${role}</span>
         <span class="tr"><i class="fl" style="background:${roleColors[role]}"></i></span>
         <span class="vv">${pct}% (${count})</span>`));
      const fl = wrap.lastElementChild.querySelector(".fl");
      fl.style.width = pct + "%";
    });
  })();
"""
    html = html.replace('/* ================= VIEW 1: architecture panel ================= */',
                        composition_logic + '\n  /* ================= VIEW 1: architecture panel ================= */')

    # 4. Modify the Graph Toolbar to include Filters and View Toggle
    new_toolbar = """
        <div class="graph-toolbar">
          <h3>Dependency graph</h3>
          <div class="seg" id="view-mode-seg">
            <button data-mode="architecture" class="on">Architecture View</button>
            <button data-mode="raw">Raw Dependency Graph</button>
          </div>
          <div class="seg" id="color-seg">
            <button data-mode="role" class="on">Architectural Role</button>
            <button data-mode="subsystem">Subsystem</button>
            <button data-mode="layer">Layer</button>
            <button data-mode="debt">Debt heat</button>
          </div>
          <div style="width:100%; margin-top:10px; display:flex; gap:10px; flex-wrap:wrap;" id="graph-filters">
            <label style="font-size:12px; color:var(--ink-2); display:flex; gap:5px;"><input type="checkbox" id="filter-tests" checked> Collapse Tests</label>
            <label style="font-size:12px; color:var(--ink-2); display:flex; gap:5px;"><input type="checkbox" id="filter-packages" checked> Collapse Packages</label>
            <label style="font-size:12px; color:var(--ink-2); display:flex; gap:5px;"><input type="checkbox" id="filter-generated" checked> Hide Generated/Docs</label>
            <label style="font-size:12px; color:var(--ink-2); display:flex; gap:5px;"><input type="checkbox" id="filter-business"> Only Business Logic</label>
          </div>
          <button class="ghost-btn" id="reset-zoom" style="margin-left:auto;">Reset view</button>
        </div>
"""
    html = re.sub(r'<div class="graph-toolbar">.*?</div>\s*<svg id="graph-svg"></svg>',
                  new_toolbar + '\n        <svg id="graph-svg"></svg>', html, flags=re.DOTALL)

    # 5. Modify the force graph rendering logic
    # Find the const graph = (() => { block and replace it entirely
    graph_logic_pattern = re.compile(r'const graph = \(\(\) => \{.*?return \{ edges: allEdges \}; // full edge list — the blast view draws from it\n  \}\)\(\);', re.DOTALL)
    
    new_graph_logic = """
  const graph = (() => {
    let currentViewMode = "architecture"; // architecture | raw
    let currentColorMode = "role"; // role | subsystem | layer | debt

    const seen = new Set(), allEdges = [];
    D.edges.forEach(([a, b]) => { const k = a + "→" + b; if (!seen.has(k) && a !== b) { seen.add(k); allEdges.push([a, b]); } });
    const deg = {}; allEdges.forEach(([a, b]) => { deg[a] = (deg[a] || 0) + 1; deg[b] = (deg[b] || 0) + 1; });
    
    // --- Compute PageRank & Approx Betweenness Centrality ---
    const pr = {}; files.forEach(f => pr[f] = 1);
    for (let i = 0; i < 20; i++) {
      const next = {}; files.forEach(f => next[f] = 0.15);
      files.forEach(f => {
        const outs = allEdges.filter(e => e[0] === f).map(e => e[1]);
        if (outs.length) {
          const share = (0.85 * pr[f]) / outs.length;
          outs.forEach(o => next[o] = (next[o] || 0) + share);
        } else {
          files.forEach(o => next[o] += (0.85 * pr[f]) / files.length);
        }
      });
      files.forEach(f => pr[f] = next[f]);
    }
    const maxPr = Math.max(...Object.values(pr)) || 1;
    files.forEach(f => pr[f] /= maxPr);

    const adjFull = {}; files.forEach(f => adjFull[f] = new Set());
    allEdges.forEach(([a, b]) => { adjFull[a].add(b); adjFull[b].add(a); });

    const bc = {}; files.forEach(f => bc[f] = 0);
    const sample = [...files].sort(() => Math.random() - 0.5).slice(0, Math.min(100, files.length));
    sample.forEach(s => {
      const S = [], P = {}, sigma = {}, d = {};
      files.forEach(v => { P[v] = []; sigma[v] = 0; d[v] = -1; });
      sigma[s] = 1; d[s] = 0;
      const Q = [s];
      while (Q.length) {
        const v = Q.shift(); S.push(v);
        (adjFull[v] || []).forEach(w => {
          if (d[w] < 0) { d[w] = d[v] + 1; Q.push(w); }
          if (d[w] === d[v] + 1) { sigma[w] += sigma[v]; P[w].push(v); }
        });
      }
      const delta = {}; files.forEach(v => delta[v] = 0);
      while (S.length) {
        const w = S.pop();
        P[w].forEach(v => { delta[v] += (sigma[v] / sigma[w]) * (1 + delta[w]); });
        if (w !== s) bc[w] += delta[w];
      }
    });
    const maxBc = Math.max(...Object.values(bc)) || 1;
    files.forEach(f => bc[f] /= maxBc);

    const maxIn = Math.max(...files.map(f => D.files[f].fanIn)) || 1;
    const maxOut = Math.max(...files.map(f => D.files[f].fanOut)) || 1;

    files.forEach(f => {
      const rw = roleWeights[D.files[f].role] || 1;
      D.files[f].centrality = bc[f];
      D.files[f].pagerank = pr[f];
      D.files[f].importance = (0.35 * bc[f] + 0.25 * pr[f] + 0.20 * (D.files[f].fanIn/maxIn) + 0.10 * (D.files[f].fanOut/maxOut) + 0.10 * rw) * rw;
    });

    const svg = $("#graph-svg");
    let vb = { x: 0, y: 0, w: 1000, h: 1000 };
    const applyVB = () => svg.setAttribute("viewBox", `${vb.x} ${vb.y} ${vb.w} ${vb.h}`);
    let dragMoved = false;

    // We will rerender the graph when filters/mode change
    const renderGraph = () => {
      svg.innerHTML = "";
      
      const isArch = currentViewMode === "architecture";
      const hideGenerated = $("#filter-generated").checked;
      const collapseTests = $("#filter-tests").checked;
      const collapsePkgs = $("#filter-packages").checked;
      const onlyBiz = $("#filter-business").checked;

      let graphFiles = [];
      let pseudoNodes = [];
      let pseudoEdges = [];

      let numTests = 0, numPkgs = 0;
      let testNodes = new Set(), pkgNodes = new Set();

      files.forEach(f => {
        const r = D.files[f].role;
        if (isArch && onlyBiz && r !== "Business Logic" && r !== "Controller" && r !== "Service" && r !== "Model" && r !== "Repository" && r !== "Utility") return;
        
        if (isArch && hideGenerated && (r === "Generated" || r === "Documentation" || r === "Examples" || r === "Scripts")) return;
        
        if (isArch && collapseTests && r === "Test") {
          numTests++; testNodes.add(f); return;
        }
        if (isArch && collapsePkgs && r === "Package") {
          numPkgs++; pkgNodes.add(f); return;
        }

        graphFiles.push(f);
      });

      if (numTests > 0) {
        pseudoNodes.push({ id: "__GROUP_TESTS__", label: `Tests (${numTests} files)`, role: "Test", r: 15 + Math.sqrt(numTests)*2, x: 0, y: 0, vx: 0, vy: 0, m: {fanIn: 0, fanOut: 0, layer: -1, debt: 0, importance: 0.5, subsystem: -1} });
      }
      if (numPkgs > 0) {
        pseudoNodes.push({ id: "__GROUP_PKGS__", label: `Packages (${numPkgs} files)`, role: "Package", r: 15 + Math.sqrt(numPkgs)*2, x: 0, y: 0, vx: 0, vy: 0, m: {fanIn: 0, fanOut: 0, layer: -1, debt: 0, importance: 0.5, subsystem: -1} });
      }

      // Filter edges
      const graphNodesSet = new Set(graphFiles);
      const filteredEdges = [];
      allEdges.forEach(([a, b]) => {
        const aGrp = testNodes.has(a) ? "__GROUP_TESTS__" : (pkgNodes.has(a) ? "__GROUP_PKGS__" : a);
        const bGrp = testNodes.has(b) ? "__GROUP_TESTS__" : (pkgNodes.has(b) ? "__GROUP_PKGS__" : b);
        
        if ((graphNodesSet.has(a) || aGrp.startsWith("__GROUP")) && 
            (graphNodesSet.has(b) || bGrp.startsWith("__GROUP"))) {
            if (aGrp !== bGrp) filteredEdges.push([aGrp, bGrp]);
        }
      });

      // dedupe grouped edges
      const uniqEdges = [];
      const seenE = new Set();
      filteredEdges.forEach(([a, b]) => {
        const k = a + "->" + b;
        if (!seenE.has(k)) { seenE.add(k); uniqEdges.push([a, b]); }
      });

      // top-N limitation for raw mode
      if (!isArch && graphFiles.length > 400) {
         graphFiles = [...graphFiles].sort((a, b) => D.files[b].importance - D.files[a].importance).slice(0, 400);
      }
      
      const allGraphNodeIds = new Set(graphFiles);
      pseudoNodes.forEach(pn => allGraphNodeIds.add(pn.id));
      
      const finalEdges = uniqEdges.filter(([a, b]) => allGraphNodeIds.has(a) && allGraphNodeIds.has(b));

      // Build node array
      const RS = graphFiles.length > 200 ? 0.6 : 1;
      const nodes = graphFiles.map(f => ({
        id: f, 
        label: base(f),
        role: D.files[f].role,
        m: D.files[f],
        r: isArch ? Math.max(5, (10 + D.files[f].importance * 40)) * RS : (4.5 + Math.sqrt((D.files[f].fanIn + D.files[f].fanOut)) * 1.7) * RS,
        x: Math.random()*200 - 100, y: Math.random()*200 - 100, vx: 0, vy: 0
      })).concat(pseudoNodes);

      const idx = {}; nodes.forEach((n, i) => idx[n.id] = i);
      const links = finalEdges.map(([a, b]) => [idx[a], idx[b]]);

      // Seed positions by subsystem
      const rankOf = {}; subOrder.forEach((s, rank) => s.members.forEach(f => rankOf[f] = rank));
      nodes.forEach((n, i) => {
        const rank = rankOf[n.id] ?? (i % 10);
        const cx0 = rank === 0 ? 0 : Math.cos(rank * 2.3999) * 320;
        const cy0 = rank === 0 ? 0 : Math.sin(rank * 2.3999) * 320;
        n.x = cx0 + Math.random()*40;
        n.y = cy0 + Math.random()*40;
      });

      // Simulate
      const TICKS = Math.max(100, Math.min(300, Math.round(300 * 100 / Math.max(nodes.length, 1))));
      for (let t = 0; t < TICKS; t++) {
        const alpha = 1 - t / TICKS;
        // Grouping force by role/subsystem
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const a = nodes[i], b = nodes[j];
                let dx = b.x - a.x, dy = b.y - a.y;
                let d2 = dx * dx + dy * dy; 
                if (d2 < 1) { d2 = 1; dx = Math.random() - .5; dy = Math.random() - .5; }
                const isSameSubsys = a.m.subsystem === b.m.subsystem && a.m.subsystem >= 0;
                const isSameRole = a.role === b.role;
                
                // Repulsion
                let rep = Math.min(12, 3000 / d2) * alpha;
                if (isSameSubsys || isSameRole) rep *= 0.3; // Less repulsion for same group

                const d = Math.sqrt(d2);
                a.vx -= dx / d * rep; a.vy -= dy / d * rep; 
                b.vx += dx / d * rep; b.vy += dy / d * rep;
            }
        }
        links.forEach(([ai, bi]) => {
          const a = nodes[ai], b = nodes[bi];
          const dx = b.x - a.x, dy = b.y - a.y, d = Math.sqrt(dx * dx + dy * dy) || 1;
          const want = 60 + (a.r + b.r);
          const f = (d - want) / d * 0.1 * alpha;
          a.vx += dx * f; a.vy += dy * f; b.vx -= dx * f; b.vy -= dy * f;
        });
        nodes.forEach(n => {
          n.vx -= n.x * 0.005 * alpha; n.vy -= n.y * 0.005 * alpha;
          const vmax = 20;
          n.vx = Math.max(-vmax, Math.min(vmax, n.vx));
          n.vy = Math.max(-vmax, Math.min(vmax, n.vy));
          n.x += n.vx; n.y += n.vy; n.vx *= 0.85; n.vy *= 0.85;
        });
      }
      
      // collision pass
      for (let t = 0; t < 150; t++) {
        let moved = false;
        for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          let dx = b.x - a.x, dy = b.y - a.y;
          let d = Math.sqrt(dx * dx + dy * dy);
          const min = a.r + b.r + 6;
          if (d >= min) continue;
          if (d < 0.01) { dx = Math.random() - .5; dy = Math.random() - .5; d = Math.sqrt(dx * dx + dy * dy); }
          const overlap = (min - d) / d;
          const wA = b.r / (a.r + b.r), wB = a.r / (a.r + b.r);
          a.x -= dx * overlap * wA; a.y -= dy * overlap * wA;
          b.x += dx * overlap * wB; b.y += dy * overlap * wB;
          moved = true;
        }
        if (!moved) break;
      }

      if (finalEdges.length > 600 || nodes.length > 200) svg.classList.add("dense");
      else svg.classList.remove("dense");
      
      const NS = "http://www.w3.org/2000/svg";
      const xs = nodes.map(n => n.x), ys = nodes.map(n => n.y);
      const pad = 60;
      const q = (arr, p) => { const s = [...arr].sort((a, b) => a - b); return s[Math.round((s.length - 1) * p)] || 0; };
      const x0 = q(xs, .02), x1 = q(xs, .98), y0 = q(ys, .02), y1 = q(ys, .98);
      const bb = { x: x0 - pad, y: y0 - pad, w: Math.max(x1 - x0, 100) + pad * 2, h: Math.max(y1 - y0, 100) + pad * 2 };
      vb = { ...bb };
      applyVB();

      const gE = document.createElementNS(NS, "g"), gN = document.createElementNS(NS, "g"), gL = document.createElementNS(NS, "g");
      svg.append(gE, gN, gL);

      const adj = {}; nodes.forEach(n => adj[n.id] = new Set());
      const edgeEls = links.map(([ai, bi]) => {
        const a = nodes[ai], b = nodes[bi];
        adj[a.id].add(b.id); adj[b.id].add(a.id);
        const p = document.createElementNS(NS, "path");
        const mx = (a.x + b.x) / 2 - (b.y - a.y) * .12, my = (a.y + b.y) / 2 + (b.x - a.x) * .12;
        p.setAttribute("d", `M${a.x},${a.y} Q${mx},${my} ${b.x},${b.y}`);
        p.setAttribute("class", "edge");
        p.dataset.a = a.id; p.dataset.b = b.id;
        gE.appendChild(p); return p;
      });

      const layerVals = [...new Set(Object.values(A.layers))].sort((a, b) => a - b);
      const layerColor = l => CAT[(layerVals.indexOf(l) * 2) % CAT.length] || "#52514e";
      const subLegend = subOrder.slice(0, 8).map(s => [subColorOf[s.i], `${subLabel(s.members)} (${s.members.length})`]);
      if (subOrder.length > 8) subLegend.push(["#52514e", `+ ${subOrder.length - 8} more subsystems`]);
      
      const roleLegend = Object.entries(roleColors).map(([r, c]) => [c, r]);

      const colorers = {
        role: n => roleColors[n.role] || "#52514e",
        subsystem: n => (subOrder.findIndex(s => s.i === n.m.subsystem) < 8 ? subColorOf[n.m.subsystem] : "#52514e") || "#52514e",
        layer: n => n.m.layer >= 0 ? layerColor(n.m.layer) : "#52514e",
        debt: n => SEQ[Math.min(6, Math.round(n.m.debt * 8))],
      };
      const legends = {
        role: roleLegend,
        subsystem: subLegend,
        layer: layerVals.map(l => [layerColor(l), l === 0 ? "Layer 0 · foundation" : `Layer ${l}`]),
        debt: [[SEQ[0], "low debt"], [SEQ[3], "moderate"], [SEQ[6], "high debt"]],
      };

      const nodeEls = nodes.map(n => {
        const g = document.createElementNS(NS, "g");
        g.setAttribute("class", "node");
        const c = document.createElementNS(NS, "circle");
        c.setAttribute("cx", n.x); c.setAttribute("cy", n.y); c.setAttribute("r", n.r);
        c.setAttribute("class", "pop"); c.style.animationDelay = (100 + Math.random() * 400) + "ms";
        g.appendChild(c); gN.appendChild(g);
        
        g.addEventListener("mousemove", e => {
          if(n.id.startsWith("__GROUP")) {
            showTip(`<b>${n.label}</b><div style="margin-top:5px;color:var(--muted)">Filtered group</div>`, e.clientX, e.clientY);
          } else {
            showTip(`<b>${esc(n.id)}</b>
              <div class="tr2"><span>role</span><span style="color:${roleColors[n.role]}">${n.role}</span></div>
              <div class="tr2"><span>importance</span><span>${n.m.importance.toFixed(3)}</span></div>
              <div class="tr2"><span>centrality</span><span>${n.m.centrality.toFixed(3)}</span></div>
              <div class="tr2"><span>pagerank</span><span>${n.m.pagerank.toFixed(3)}</span></div>
              <div class="tr2"><span>degree</span><span>${n.m.fanIn + n.m.fanOut}</span></div>
              <div style="margin-top:5px;color:#86b6ef">click → impact analysis</div>`, e.clientX, e.clientY);
          }
          highlight(n.id);
        });
        g.addEventListener("mouseleave", () => { hideTip(); highlight(null); });
        g.addEventListener("click", () => { if (dragMoved || n.id.startsWith("__GROUP")) return; selectFile(n.id); setView("impact"); });
        return g;
      });

      // labels for top important nodes
      let numLabels = isArch ? 20 : 12;
      [...nodes].sort((a, b) => b.m.importance - a.m.importance).slice(0, numLabels).forEach(n => {
        const t = document.createElementNS(NS, "text");
        t.setAttribute("x", n.x); t.setAttribute("y", n.y - n.r - 5);
        t.setAttribute("text-anchor", "middle"); t.setAttribute("class", "nlabel");
        t.textContent = n.label;
        gL.appendChild(t);
      });

      const recolor = () => {
        nodes.forEach((n, i) => nodeEls[i].querySelector("circle").setAttribute("fill", colorers[currentColorMode](n)));
        const lg = $("#graph-legend"); lg.innerHTML = "";
        legends[currentColorMode].forEach(([c, l]) => lg.appendChild(el("span", "li", `<span class="sw" style="background:${c}"></span>${l}`)));
      };
      recolor();

      const highlight = id => {
        if (!id) {
          nodeEls.forEach(g => g.classList.remove("dim"));
          edgeEls.forEach(p => p.classList.remove("dim", "lit"));
          return;
        }
        const keep = adj[id]; keep.add(id);
        nodes.forEach((n, i) => nodeEls[i].classList.toggle("dim", !keep.has(n.id)));
        edgeEls.forEach(p => {
          const lit = p.dataset.a === id || p.dataset.b === id;
          p.classList.toggle("lit", lit); p.classList.toggle("dim", !lit);
        });
        keep.delete(id);
      };
    };

    renderGraph();

    $$("#view-mode-seg button").forEach(b => b.addEventListener("click", () => {
      $$("#view-mode-seg button").forEach(x => x.classList.toggle("on", x === b));
      currentViewMode = b.dataset.mode;
      const f = $("#graph-filters");
      if (currentViewMode === "raw") f.style.display = "none";
      else f.style.display = "flex";
      renderGraph();
    }));

    $$("#color-seg button").forEach(b => b.addEventListener("click", () => {
      $$("#color-seg button").forEach(x => x.classList.toggle("on", x === b));
      currentColorMode = b.dataset.mode;
      // We don't need to re-render physics, just re-run recolor but since it's trapped in renderGraph scope...
      // We actually should make recolor accessible outside, but for simplicity we can just re-render.
      // Wait, let's just trigger renderGraph()!
      renderGraph();
    }));

    $$("#graph-filters input").forEach(chk => chk.addEventListener("change", renderGraph));

    // zoom & pan
    const svg = $("#graph-svg");
    let vb = { x: 0, y: 0, w: 1000, h: 1000 };
    const applyVB = () => svg.setAttribute("viewBox", `${vb.x} ${vb.y} ${vb.w} ${vb.h}`);
    
    svg.addEventListener("wheel", e => {
      e.preventDefault();
      const k = e.deltaY > 0 ? 1.12 : 1 / 1.12;
      const pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
      const p = pt.matrixTransform(svg.getScreenCTM().inverse());
      vb = { x: p.x - (p.x - vb.x) * k, y: p.y - (p.y - vb.y) * k, w: vb.w * k, h: vb.h * k };
      applyVB();
    }, { passive: false });

    let drag = null, dragMoved = false;
    svg.addEventListener("pointerdown", e => { drag = { x: e.clientX, y: e.clientY, vb: { ...vb }, id: e.pointerId }; dragMoved = false; });
    svg.addEventListener("pointermove", e => {
      if (!drag) return;
      if (!dragMoved && Math.hypot(e.clientX - drag.x, e.clientY - drag.y) > 4) {
        dragMoved = true;
        svg.setPointerCapture(drag.id);
      }
      if (!dragMoved) return;
      const scale = vb.w / svg.clientWidth;
      vb.x = drag.vb.x - (e.clientX - drag.x) * scale;
      vb.y = drag.vb.y - (e.clientY - drag.y) * scale;
      applyVB();
    });
    svg.addEventListener("pointerup", () => drag = null);
    $("#reset-zoom").addEventListener("click", () => { renderGraph(); });
    svg.addEventListener("dblclick", () => { renderGraph(); });

    return { edges: allEdges };
  })();
"""
    html = graph_logic_pattern.sub(new_graph_logic.replace('\\', '\\\\'), html)

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Done")

process_html()
