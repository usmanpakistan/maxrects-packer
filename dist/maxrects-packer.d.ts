import { Rectangle, IRectangle } from "./geom/Rectangle";
import { Bin, IBin } from "./abstract-bin";
export declare const EDGE_MAX_VALUE: number;
export declare const EDGE_MIN_VALUE: number;
export declare enum PACKING_LOGIC {
    MAX_AREA = 0,
    MAX_EDGE = 1,
    FILL_WIDTH = 2
}
/**
 * Options for MaxRect Packer
 *
 * @property {boolean} options.smart Smart sizing packer (default is true)
 * @property {boolean} options.pot use power of 2 sizing (default is true)
 * @property {boolean} options.square use square size (default is false)
 * @property {boolean} options.allowRotation allow rotation packing (default is false)
 * @property {boolean} options.tag allow auto grouping based on `rect.tag` (default is false)
 * @property {boolean} options.exclusiveTag tagged rects will have dependent bin, if set to `false`, packer will try to put tag rects into the same bin (default is true)
 * @property {boolean} options.border atlas edge spacing (default is 0)
 * @property {PACKING_LOGIC} options.logic MAX_AREA or MAX_EDGE based sorting logic (default is MAX_EDGE)
 * @export
 * @interface Option
 */
export interface IOption {
    smart?: boolean;
    pot?: boolean;
    square?: boolean;
    allowRotation?: boolean;
    tag?: boolean;
    exclusiveTag?: boolean;
    border?: number;
    logic?: PACKING_LOGIC;
}
export declare class MaxRectsPacker<T extends IRectangle = Rectangle> {
    width: number;
    height: number;
    padding: number;
    /**
     * The Bin array added to the packer
     *
     * @type {Bin[]}
     * @memberof MaxRectsPacker
     */
    bins: Bin<T>[];
    /**
     * Options for MaxRect Packer
     *
     * @property {boolean} options.smart Smart sizing packer (default is true)
     * @property {boolean} options.pot use power of 2 sizing (default is true)
     * @property {boolean} options.square use square size (default is false)
     * @property {boolean} options.allowRotation allow rotation packing (default is false)
     * @property {boolean} options.tag allow auto grouping based on `rect.tag` (default is false)
     * @property {boolean} options.exclusiveTag tagged rects will have dependent bin, if set to `false`, packer will try to put tag rects into the same bin (default is true)
     * @property {boolean} options.border atlas edge spacing (default is 0)
     * @property {PACKING_LOGIC} options.logic MAX_AREA or MAX_EDGE based sorting logic (default is MAX_EDGE)
     * @export
     * @interface Option
     */
    options: IOption;
    /**
     * Creates an instance of MaxRectsPacker.
     *
     * @param {number} width of the output atlas (default is 4096)
     * @param {number} height of the output atlas (default is 4096)
     * @param {number} padding between glyphs/images (default is 0)
     * @param {IOption} [options={}] (Optional) packing options
     * @memberof MaxRectsPacker
     */
    constructor(width?: number, height?: number, padding?: number, options?: IOption);
    /**
     * Add a bin/rectangle object with data to packer
     *
     * @param {number} width of the input bin/rectangle
     * @param {number} height of the input bin/rectangle
     * @param {*} data custom data object
     * @memberof MaxRectsPacker
     */
    add(width: number, height: number, data: any): T;
    /**
     * Add a bin/rectangle object extends IRectangle to packer
     *
     * @template T Generic type extends IRectangle interface
     * @param {T} rect the rect object add to the packer bin
     * @memberof MaxRectsPacker
     */
    add(rect: T): T;
    /**
     * Add an Array of bins/rectangles to the packer.
     *
     * `Javascript`: Any object has property: { width, height, ... } is accepted.
     *
     * `Typescript`: object shall extends `MaxrectsPacker.IRectangle`.
     *
     * note: object has `hash` property will have more stable packing result
     *
     * @param {IRectangle[]} rects Array of bin/rectangles
     * @memberof MaxRectsPacker
     */
    addArray(rects: T[]): void;
    /**
     * Reset entire packer to initial states, keep settings
     *
     * @memberof MaxRectsPacker
     */
    reset(): void;
    /**
     * Repack all elements inside bins
     *
     * @param {boolean} [quick=true] quick repack only dirty bins
     * @returns {void}
     * @memberof MaxRectsPacker
     */
    repack(quick?: boolean): void;
    /**
     * Stop adding new element to the current bin and return a new bin.
     *
     * note: After calling `next()` all elements will no longer added to previous bins.
     *
     * @returns {Bin}
     * @memberof MaxRectsPacker
     */
    next(): number;
    /**
     * Load bins to the packer, overwrite exist bins
     *
     * @param {MaxRectsBin[]} bins MaxRectsBin objects
     * @memberof MaxRectsPacker
     */
    load(bins: IBin[]): void;
    /**
     * Output current bins to save
     *
     * @memberof MaxRectsPacker
     */
    save(): IBin[];
    /**
     * Sort the given rects based on longest edge or surface area.
     *
     * If rects have the same sort value, will sort by second key `hash` if presented.
     *
     * @private
     * @param {T[]} rects
     * @param {PACKING_LOGIC} [logic=PACKING_LOGIC.MAX_EDGE] sorting logic, "area" or "edge"
     * @returns
     * @memberof MaxRectsPacker
     */
    private sort;
    private _currentBinIndex;
    /**
     * Return current functioning bin index, perior to this wont accept any new elements
     *
     * @readonly
     * @type {number}
     * @memberof MaxRectsPacker
     */
    get currentBinIndex(): number;
    /**
     * Returns dirty status of all child bins
     *
     * @readonly
     * @type {boolean}
     * @memberof MaxRectsPacker
     */
    get dirty(): boolean;
    /**
     * Return all rectangles in this packer
     *
     * @readonly
     * @type {T[]}
     * @memberof MaxRectsPacker
     */
    get rects(): T[];
}
