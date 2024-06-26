import { IOption } from "./maxrects-packer";
import { Rectangle, IRectangle } from "./geom/Rectangle";
import { Bin } from "./abstract-bin";
export declare class MaxRectsBin<T extends IRectangle = Rectangle> extends Bin<T> {
    maxWidth: number;
    maxHeight: number;
    padding: number;
    width: number;
    height: number;
    freeRects: Rectangle[];
    rects: T[];
    private verticalExpand;
    private stage;
    private border;
    options: IOption;
    constructor(maxWidth?: number, maxHeight?: number, padding?: number, options?: IOption);
    add(rect: T): T | undefined;
    add(width: number, height: number, data: any): T | undefined;
    repack(): T[] | undefined;
    reset(deepReset?: boolean, resetOption?: boolean): void;
    clone(): MaxRectsBin<T>;
    private place;
    /**
     * Find the best rect out of freeRects
     * This method has different logics to resolve the best rect.
     * @param width
     * @param height
     * @param allowRotation
     * @returns Rectangle of the best rect for placement
     */
    private findNode;
    private splitNode;
    private pruneFreeList;
    private updateBinSize;
    private expandFreeRects;
}
