const VM = require('../models/VM');
const User = require('../models/User');

exports.createVM = async (name, specs, userId) => {
  const user = await User.findById(userId);
  const vmCount = await VM.countDocuments({ user: userId });

  if (vmCount >= getVMLimit(user.ratePlan)) {
    throw new Error('VM limit reached for your rate plan');
  }

  const newVM = new VM({ name, specs, user: userId });
  await newVM.save();
  return newVM;
};

exports.updateVM = async (vmId, updateData) => {
  const vm = await VM.findByIdAndUpdate(vmId, updateData, { new: true });
  if (!vm) {
    throw new Error('VM not found');
  }
  return vm;
};

exports.deleteVM = async (vmId) => {
  const vm = await VM.findByIdAndDelete(vmId);
  if (!vm) {
    throw new Error('VM not found');
  }
};

exports.moveVM = async (vmId, newUserId) => {
  const vm = await VM.findById(vmId);
  if (!vm) {
    throw new Error('VM not found');
  }

  const newUser = await User.findById(newUserId);
  if (!newUser) {
    throw new Error('New user not found');
  }

  vm.user = newUserId;
  await vm.save();
  return vm;
};

function getVMLimit(ratePlan) {
  const limits = {
    bronze: 1,
    silver: 3,
    gold: 5,
    platinum: 10
  };
  return limits[ratePlan] || 1;
}