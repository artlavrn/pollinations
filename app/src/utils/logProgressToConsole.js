import {MultiBar, Presets, SingleBar} from 'cli-progress';

const multibar = new MultiBar({
    clearOnComplete: false,
    hideCursor: false,
    format: ' {bar} | "{cid}" | {value}/{total}',
    // barCompleteChar: '\u2588',
    // barIncompleteChar: '\u2591',
    stopOnComplete: false,
    fps:8
});

const logProgress = (total, name="") => { 
    
    const bar = multibar.create(total, 0, {name});

    const update = increment => {
        bar.increment(increment);
    }

    const remove = () => {
        // bar.stop();
        multibar.remove(bar);
    }

    return [update, remove];
} 

export default logProgress;

export const logProgressAsync = async function* (iterator, total, name)  {
    const [log, remove] = logProgress(total,name);
    for await (const chunk of iterator) {
        log(chunk.length,name);
        yield(chunk);
    }
    remove();
}