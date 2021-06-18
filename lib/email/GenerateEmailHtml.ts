import ConvertBlockToMJML from "@/lib/editorjs/ConvertBlockToMJML";
import { OutputBlockData } from "@editorjs/editorjs";

function GenerateHead() {
  return `<mj-head>
      <mj-style>
        .text-center {
          display: block;
          text-align: center;
        }
      </mj-style>
    </mj-head>`;
}

function GenerateHeader() {
  return `<mj-section background-color="#371A34" background-url="https://dmmedia.sphero.com/email-marketing/Sphero/Mini-Launch-email-Top-BarBG.jpg" padding="0px">
      <mj-column>
        <mj-image align="center" width="384px" src="https://azjgwzhqpq.cloudimg.io/v7/_indiebaie/BDEWeb/logowebbde.png?w=384&q=100" />
      </mj-column>
    </mj-section>`;
}

function GenerateFooter() {
  return `<mj-section background-color="#EBE8EB">
    <mj-column>
      <mj-divider border-width="2px" border-color="#20201E" />
      <mj-text>
      <span class="text-center">
        <a href="https://www.facebook.com/EvryBodyMiage"> <img width="25px" src="https://azjgwzhqpq.cloudimg.io/v7/_indiebaie/BDEWeb/facebook.png?q=100" /></a>
        <a style="margin-left: 10px;" href="https://www.instagram.com/evrybody_miage"> <img width="25px" src="https://azjgwzhqpq.cloudimg.io/v7/_indiebaie/BDEWeb/instagram.png?q=100" /></a>
        <a style="margin-left: 10px;" href="https://discord.gg/W55yuxNjYS"> <img width="25px" src="https://azjgwzhqpq.cloudimg.io/v7/_indiebaie/BDEWeb/discord.png?q=100" /></a>
        </span>
      </mj-text>
    </mj-column>
  </mj-section>`;
}

function GenerateSection(content: string) {
  return `<mj-section background-color="#EBE8EB" padding="20px 10px 0 10px">
  <mj-column>${content}</mj-column>
  </mj-section>`;
}

function GenerateEmail(content: string) {
  return `<mjml>${GenerateHead()}<mj-body>${GenerateHeader()}${content}${GenerateFooter()}</mj-body></mjml>`;
}

export default function GenerateEmailHtml(blocks: OutputBlockData[]): string {
  const sectionsContent = blocks.reduce<string[][]>(
    (sections, currentBlock) => {
      if (currentBlock.type === "header" || sections.length === 0)
        sections.push([]);
      if (currentBlock)
        sections[sections.length - 1].push(ConvertBlockToMJML(currentBlock));
      return sections;
    },
    []
  );

  const sectionsMJML = sectionsContent
    .map((section) => GenerateSection(section.join("")))
    .join("");

  return GenerateEmail(sectionsMJML);
}
