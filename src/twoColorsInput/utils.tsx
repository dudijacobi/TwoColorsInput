import { position } from "caret-pos";

export const getPosition = (element: HTMLSpanElement): number => {
  if (!element) {
    return 0;
  }
  return position(element).pos;
};

/** https://stackoverflow.com/questions/36869503/set-caret-position-in-contenteditable-div-that-has-children */
export const setCaretPosition = (el: ChildNode, pos: number): number => {
  for (const node of el.childNodes) {
    if (node.nodeType == Node.TEXT_NODE) {
      // we have a text node
      if (node.textContent) {
        if (node.textContent.length >= pos) {
          // finally add our range
          const range = document.createRange(),
            selection = window.getSelection();
          range.setStart(node, pos);
          range.collapse(true);
          selection?.removeAllRanges();
          selection?.addRange(range);
          return -1; // we are done
        } else {
          pos -= node.textContent.length;
        }
      }
    } else {
      pos = setCaretPosition(node, pos);
      if (pos === -1) {
        return -1; // no need to finish the for loop
      }
    }
  }
  return pos; // needed because of recursion stuff
};
