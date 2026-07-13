import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export function SkillTree() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    
    // Clear previous
    d3.select(svgRef.current).selectAll('*').remove();

    const data = {
      name: "Core Math",
      status: "mastered",
      children: [
        {
          name: "Algebra",
          status: "mastered",
          children: [
            { name: "Equations", status: "mastered" },
            { name: "Polynomials", status: "in-progress" },
            { name: "Inequalities", status: "locked" }
          ]
        },
        {
          name: "Geometry",
          status: "in-progress",
          children: [
            { name: "Triangles", status: "mastered" },
            { name: "Circles", status: "locked" }
          ]
        }
      ]
    };

    const width = 800;
    const height = 350;
    const margin = { top: 30, right: 120, bottom: 30, left: 120 };

    const svg = d3.select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("width", "100%")
      .attr("height", "100%")
      .style("max-height", "350px")
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const root = d3.hierarchy(data);
    const treeLayout = d3.tree<any>().size([height - margin.top - margin.bottom, width - margin.left - margin.right]);
    treeLayout(root);

    // Links
    svg.selectAll(".link")
      .data(root.links())
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("fill", "none")
      .attr("stroke", "#cbd5e1")
      .attr("stroke-width", 2)
      .attr("d", d3.linkHorizontal<d3.HierarchyPointLink<any>, d3.HierarchyPointNode<any>>()
        .x(d => d.y)
        .y(d => d.x)
      );

    // Nodes
    const node = svg.selectAll(".node")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", d => `translate(${d.y},${d.x})`);

    node.append("circle")
      .attr("r", 8)
      .attr("fill", d => {
        if (d.data.status === "mastered") return "#10b981"; // emerald-500
        if (d.data.status === "in-progress") return "#3b82f6"; // blue-500
        return "#94a3b8"; // slate-400
      })
      .attr("stroke", "#fff")
      .attr("stroke-width", 2);

    node.append("text")
      .attr("dy", -12)
      .attr("x", 0)
      .style("text-anchor", "middle")
      .text(d => d.data.name)
      .attr("font-size", "12px")
      .attr("font-weight", d => d.data.status === "locked" ? "normal" : "bold")
      .attr("fill", d => {
        // Adjust for theme if possible, standard dark gray for light mode
        return "#334155";
      });

  }, []);

  return (
    <div className="w-full bg-surface-container-lowest rounded-xl border border-surface-variant p-4 flex flex-col items-center overflow-x-auto">
      <div className="w-full flex justify-between items-center mb-4">
        <h3 className="text-[16px] font-bold text-on-surface">Curriculum Skill Tree</h3>
        <div className="flex gap-3 text-[12px] font-medium text-on-surface-variant">
          <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Mastered</span>
          <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div> In Progress</span>
          <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-slate-400"></div> Locked</span>
        </div>
      </div>
      <svg ref={svgRef} className="min-h-[280px]"></svg>
    </div>
  );
}
