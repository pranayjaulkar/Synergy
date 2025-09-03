import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import JavascriptLogo from "../icons/JavascriptLogo";
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Sidebar() {
  return (
    <div className="flex flex-col justify-start h-full border">
      {/* Section Header */}
      <ScrollArea>
        <div className="flex items-center py-1 border-b ">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="px-2 py-1">Explorer</AccordionTrigger>
              <AccordionContent>
                {["dummyFile1.js", "dummyFile2.js", "dummyFile3.js", "dummyFile4.js"].map((fileName) => (
                  <button className="w-full cursor-pointer hover:bg-zinc-800 focus:bg-zinc-800 flex justify-start items-center space-x-2 py-0.5  px-4">
                    <JavascriptLogo size={12} className="rounded-[3px]" />
                    <span>{fileName}</span>
                  </button>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </ScrollArea>
    </div>
  );
}
