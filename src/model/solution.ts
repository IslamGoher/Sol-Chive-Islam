import mongoose, { ObjectId, Document } from "mongoose";

type SolutionDocument = Document & {
  mySolution: string,
  perfectSolution: {
    isExist: boolean,
    code?: string
  },
  problem: {
    title: string,
    link: string,
    source: string,
    tags: string[]
  },
  user: ObjectId,
  createdAt: Date
}

let tagsEnum = [
  "array", "queue", "stack",
  "heap", "trie", "linkedlist",
  "tree", "graph", "map",
  "string", "hash table", "sort",
  "search", "algorithm", "Depth-First search",
  "Breadth-First search", "greedy", "recursion",
  "database", "matrix", "memorization"
];

const validateTags = (val: string[]) => {
  let check = true;
  for(let i = 0 ; i < val.length; i++) {
    let isFalse = tagsEnum.includes(val[i]);
    if(!isFalse) {
      return isFalse;
    }
  }
  return check;
}

let tagsValidator = [validateTags, "please pick a valid tags"]

// create solution schema
const solutionSchema = new mongoose.Schema<SolutionDocument>({
  mySolution: {
    type: String,
    required: [true, 'please add mySolution']
  },
  perfectSolution: {
    isExist: {
      type: Boolean,
      default: false,
      required: true
    },
    code: String
  },
  problem: {
    title: {
      type: String,
      required: [true, 'please add title of problem']
    },
    link: {
      type: String,
      required: [true, 'please add problem link'],
      match: [
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        "please add a valid url of problem"
      ]
    },
    source: {
      type: String,
      required: true,
      enum: ["leetcode", "codewars", "hackerrank", "codeforces", "other source"]
    },
    tags: {
      type: [String],
      validate: tagsValidator
    }
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: false
  }
});

// create solution model
export const Solution = mongoose.model<SolutionDocument>('solutions', solutionSchema);