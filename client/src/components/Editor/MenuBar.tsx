import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";

export default function MenuBar() {
  const handleNewFile = () => {};
  const menus = [
    {
      name: "File",
      menuItems: [
        { name: "New file", shortcut: "⌘N", action: handleNewFile },
        {
          name: "Share",
          separator: true,
          menuItems: [{ name: "Email link" }, { name: "Whatsapp" }],
        },
      ],
    },
    {
      name: "Edit",
      menuItems: [
        { name: "Undo", shortcut: null, action: () => {} },
        { name: "Redo", shortcut: null, action: () => {} },
        {
          name: "Find",
          shortcut: null,
          separator: true,
          menuItems: [{ name: "Find Next" }, { name: "Find Previous" }, { name: "Find..." }],
        },
        { name: "Cut", shortcut: null, action: () => {} },
        { name: "Copy", shortcut: null, action: () => {} },
        { name: "Paste", shortcut: null, action: () => {} },
      ],
    },
  ];

  return (
    <div className="w-screen bg-zinc-800 flex items-center space-x-2">
      <div className="size-8 mx-2 rounded-lg overflow-hidden">
        <img src="/synergy-logo.png" alt="" className="w-full h-full object-cover" />
      </div>
      <Menubar className="w-full bg-zinc-800 rounded-none">
        {menus.map((menu) => (
          <MenubarMenu key={menu.name}>
            <MenubarTrigger className="cursor-pointer">{menu.name}</MenubarTrigger>
            <MenubarContent className="bg-zinc-800 ">
              {menu.menuItems.map((item) => (
                <>
                  {item.separator && <MenubarSeparator />}
                  {item.menuItems ? (
                    <MenubarSub>
                      <MenubarSubTrigger>{item.name}</MenubarSubTrigger>
                      <MenubarSubContent className="bg-zinc-800 ">
                        {item.menuItems.map((subMenuItem) => (
                          <MenubarItem>{subMenuItem.name}</MenubarItem>
                        ))}
                      </MenubarSubContent>
                    </MenubarSub>
                  ) : (
                    <MenubarItem className="cursor-pointer">
                      {item.name}
                      {item.shortcut && <MenubarShortcut>{item.shortcut}</MenubarShortcut>}
                    </MenubarItem>
                  )}
                  {item.separator && <MenubarSeparator />}
                </>
              ))}
            </MenubarContent>
          </MenubarMenu>
        ))}
      </Menubar>
    </div>
  );
}
