import { createSlice } from "@reduxjs/toolkit";

const initialMembers = [
  { id: 1, name: "You" },
  { id: 2, name: "Alex" },
  { id: 3, name: "Sam" },
  { id: 4, name: "Taylor" },
];
const initialState = { memberList: initialMembers };

const MemberSlice = createSlice({
  initialState,
  name: "members",
  reducers: {
    addMember: (state, action) => {
      state.memberList.push({
        id: state.memberList.length,
        name: action.payload,
      });
    },
    removeMember: (state, action) => {
      state.memberList = state.memberList.filter(
        (item) => item.id === action.payload
      );
    },
  },
});

export const { addMember, removeMember } = MemberSlice.actions;
export default MemberSlice.reducer;
